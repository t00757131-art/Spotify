import { Inngest } from "inngest";
import User from "../models/user.model.ts";

interface ClerkUserCreated  {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string;
  last_name: string;
  image_url: string;
};

// Create a client to send and receive events
export const inngest = new Inngest({ id: "spotify" });

const syncUser = inngest.createFunction(

    {id:"sync-user",triggers:[{event:"clerk/user.created"}]},

    async ({event}:{event:{data:ClerkUserCreated}})=>{
        const user = event.data;

        await User.findOneAndUpdate(
            {clerkId:user.id},
            {
                clerkId:user.id,
                email:user.email_addresses[0]?.email_address,
                fullname:`${user.first_name} ${user.last_name}`,
                imageUrl:user.image_url,

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
        const user = event.data;

        await User.findOneAndDelete(
            {clerkId:user.id}
        )
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUser];