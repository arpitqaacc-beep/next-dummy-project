import Link from "next/link";
import './../style.css';
import DeleteButton from "./deleteButton";

async function getUser(params) {
    let data = await fetch(`http://localhost:3000/api/users`);
    return data.json();

}


export default async function UsersPage() {
    const users = await getUser();
    return (
        <div>
            <h1>Users List</h1>

            {users.map((user) => (
                <div key={user.id} className="user-item">
                    {/* <p>{user.name} - {user.email}</p> */}
                    <span> <Link href={`/users/${user.id}`}>{user.name}</Link></span>
                    <span> <Link href={`/users/${user.id}/update`}>Edit</Link></span>
                    <DeleteButton id={user.id} />
                </div>
            ))}
        </div>
    );
}