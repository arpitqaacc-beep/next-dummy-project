const { username, password } = process.env;

console.log("username, password", username, password);

export const connectionSrt = "mongodb+srv://" + username + ":" + password + "@cluster0.kpofiac.mongodb.net/ProductDB?retryWrites=true&w=majority&appName=Cluster0"

