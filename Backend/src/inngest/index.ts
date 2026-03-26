import { Inngest } from "inngest";
import User from "../models/user.model.ts";
import "dotenv/config";

const INNGEST_SIGNING_KEY = process.env.INNGEST_SIGNING_KEY || "";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "spotify",signingKey:INNGEST_SIGNING_KEY ,streaming:true});

const syncUser = inngest.createFunction(

    {id:"sync-user",triggers:[{event:"clerk/user.created"}]},

    async ({event})=>{
        console.log('Sync user running ')
        const user = event.data;
        const { id, first_name, last_name, image_url } = user;
        const email = user.email_addresses[0]?.email_address;

        const emailName = email.split("@")[0];

        const formattedEmailName = emailName
        .replace(/[._-]/g, " ")   // john_doe → john doe
        .replace(/\b\w/g, (c:string) => c.toUpperCase()); // John Doe

        const fullname =
          (first_name || last_name)
            ? `${first_name ?? ""} ${last_name ?? ""}`.trim()
            : formattedEmailName;

        await User.findOneAndUpdate(
            {clerkId:user.id},
            {
                clerkId:id,
                email,
                fullname:`${first_name} ${last_name || ""}`,
                imageUrl:image_url,

            },
            {
                upsert:true,returnDocument:"after"
            }
        )
    }
    
)

const deleteUser = inngest.createFunction(

    {id:"delete-user",triggers:[{event:"clerk/user.deleted"}]},

    async ({event})=>{
        console.log('Delete user running ')
        const {id} = event.data;

        await User.findOneAndDelete(
            {clerkId:id}
        )
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUser];

