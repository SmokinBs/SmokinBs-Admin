import React from "react";
import Layout from "Layouts";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

const Dashboard = ({ session }: any) => {
    session = JSON.parse(session);
    return (
        <Layout title="Home">
            <h1>Welcome, {session.user.name}!</h1>
        </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/dashboard",
    async getServerSideProps(ctx) {
        const session = getSession(ctx.req, ctx.res);
        return { props: { session: JSON.stringify(session) } };
    },
});
export default Dashboard;
