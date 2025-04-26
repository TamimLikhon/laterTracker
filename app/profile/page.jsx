import ReminderList from "@/app/components/fetchReminder";
export default function ProfileDasboard(){
    return(
        <div>
            <h1 className="text-4xl font-bold text-center mt-10">Profile Dashboard</h1>
            <p className="text-center mt-4 text-gray-600">Manage your profile settings and preferences here.</p>
            <ReminderList />
        </div>
    )
}