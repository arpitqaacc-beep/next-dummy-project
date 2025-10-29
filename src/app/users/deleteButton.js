'use client';
export default function DeleteButton(props) {

    const handleDelete = async () => {
    console.log("Delete button clicked", props.id);
    const id = props.id;
    const deleteUser = async () => {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if (!data.success) {
            alert(data.message);
            return;
        }
        alert('User deleted successfully!');
        console.log("data", data);
    }
    deleteUser();
}

    return (
        <button type="button" className="button" onClick={handleDelete}>Delete</button>
    );
}