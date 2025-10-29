
async function getProduct(params) {
    let data = await fetch(`http://localhost:3000/api/products`);
     console.log("data 23", data);
    return data.json();

}

export default async function ProductPage() {
    const products = await getProduct();
    console.log("products 23", products, products.length);
    return (
        <div>
            <h1> Product Page</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Company</th>
                        <th>Color</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products !== undefined && products.result.length>0 && products.result.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.company}</td>
                            <td>{product.color}</td>
                            <td>{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}