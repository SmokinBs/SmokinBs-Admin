import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/dashboard");
    });

    return null;
};
export default Home;
