
'use client'
import AddKey from "@/components/addKey";
import KeyList from "@/components/keyList";
export default function Dashboard() {

    return (
        <div className="px-4 py-2">
            <div className="flex justify-between ">
                <div className="font-semibold ">Keys</div>
                <div>
                    <AddKey />
                </div>
            </div>
            <div className="py-3">
                <KeyList />
            </div>
        </div>
    );
}