import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/hooks/use-auth";


export interface Item  {
    title: String,
    description: String,
    image_url: String,
    tags: String[],
    date: String,
    location: String,
    floor_cost: String|null,
    bio: String,
    npub: String,
}


export interface ItemState {
    addItem:(item: Item) => Promise<void>
    deleteItem:(id:string)=>Promise<void>
}

const useItemStore = create<ItemState>((set,get)=>({
    addItem: async (item:Item)=>{

    },
    deleteItem: async ()=> {

    }
})

)