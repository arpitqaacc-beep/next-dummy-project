async function getUserDetail(id) {
    let data = await fetch(`http://localhost:3000/api/users/${id}`);
    return await data.json();


}

export default async function UserDetails({ params }) {
    console.log("params", params);
    const userid = await params.userid;
    console.log("params userid", userid);
    const user = await getUserDetail(userid);
    console.log("params user", user);
    return (<div>
        User Name: {user.result.name}
        <br/>
        User Email: {user.result.email}
    </div>)
}