import Layout from "Layouts";
import React, { useRef } from "react";
import { Accordion, AccordionItem, Button, EvaIcon, Tab, Tabs, Toastr, ToastrRef } from "@paljs/ui";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/dashboard/orders",
    async getServerSideProps() {
        const data = await (
            await fetch(`${process.env.API_URL}/v0/orders/find-all`, { headers: { "Authorization": process.env.API_CREDENTIALS! }})
        ).json();

		if (data.success) {
			return {
				props: {
					orders: data.orders,
				},
			};
		} else {
			return {
				notFound: true,
			}
		}
    },
});

const Orders = (props: { orders: any }) => {
    let toastrRef = useRef<ToastrRef>(null);
    function MakeCard({ id, name }: any) {
        return (
            <>
                {props.orders.map((_order: any, _index: any) => (
                    <Accordion>
                        <AccordionItem uniqueKey={id} title={name}>
                            Click the eye to view order
                            <br />
                            <Button className="mT1" onClick={() => (location.href = `/dashboard/orders/view/${id}`)}>
                                <EvaIcon name="eye" />
                            </Button>
                        </AccordionItem>
                    </Accordion>
                ))}
            </>
        );
    }

    return (
        <Layout title="Orders Dashboard">
            <Toastr ref={toastrRef} />
            <Tabs fullWidth>
                <Tab
                    title="Current Orders"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: props.orders.filter((order: any) => order.finishedOrder === false).length,
                    }}
                    responsive
                >
                    {props.orders
                        .filter((order: any) => order.finishedOrder === false)
                        .map((item: { _id: any; customer: any; orderDate: any }) => (
                            <MakeCard
                                id={item._id}
                                name={`${item.customer.name} - ${new Date(item.orderDate).toLocaleDateString()}`}
                            />
                        ))}
                </Tab>
                <Tab
                    title="Finished orders"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: props.orders.filter((order: any) => order.finishedOrder === true).length,
                    }}
                    responsive
                >
                    {props.orders
                        .filter((order: any) => order.finishedOrder === true)
                        .map((item: { _id: any; customer: any; orderDate: any }) => (
                            <MakeCard
                                id={item._id}
                                name={`${item.customer.name} - ${new Date(item.orderDate).toLocaleDateString()}`}
                            />
                        ))}
                </Tab>
            </Tabs>
        </Layout>
    );
};

export default Orders;
