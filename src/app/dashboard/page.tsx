import { UserButton } from "@clerk/nextjs";

export default function Dashboard(){
    return (
        <div>
        <div>Dashboard</div>
        <div>   
            <UserButton />
        </div>
        </div>
    )
}