import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button, Checkbox, EvaIcon, Popover, Toastr, ToastrRef } from "@paljs/ui";
import Layout from "Layouts";
import React, { useRef, useState } from "react";

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/dashboard/orders",
    async getServerSideProps(ctx) {
        const orderId = ctx.req.url?.replace("?", "")?.split("/")[4];

        const data = await(
            await fetch(
                `${process.env.API_URL}/v0/orders/find-one?id=${orderId}`, { headers: { "Authorization": process.env.API_CREDENTIALS! }}
            )
        ).json();

        return {
            props: {
                order: data.order,
            },
        };
    },
});

const View = ({ order }: any) => {
    let toastrRef = useRef<ToastrRef>(null);
    const [finishedOrder, setFinishedOrder] = useState(order.finishedOrder);

    const submitOrder = async () => {
        const res = await (
            await fetch("/api/database/orders/update", {
                method: "POST",
                body: JSON.stringify({ orderId: order._id, finishedOrder }),
            })
        ).json();
        console.log(res.success);

        if (res.success) {
            location.reload();
            toastrRef.current?.add(`Changed FinishedOrder to ${finishedOrder}`, "Successfully Updated!", {
                position: "topEnd",
                duration: 10_000,
                status: "Success",
                hasIcon: true,
                destroyByClick: true,
            });
        } else {
            location.reload();
            toastrRef.current?.add(`Error: ${res.errorMessage}`, "Issue with saving order", {
                position: "topEnd",
                duration: 10_000,
                status: "Danger",
                hasIcon: true,
                destroyByClick: true,
            });
        }
    };
    return (
        <Layout title={`Viewing Order ${order.customer.invoice_prefix}`}>
            <Toastr ref={toastrRef} />
            <h1>{order.customer.invoice_prefix}</h1>
            <>
                <h4>Details</h4>
                <br />
                <p>
                    Name - <strong>{order.customer.name}</strong>
                </p>
                <p>
                    Phone Number - 
                    <strong>
                        {order.personalDetails?.phoneNumber ? order.personalDetails.phoneNumber : "No Number Saved"}
                    </strong>
                </p>
                <p>
                    Address - <strong>{order.customer.shipping.address.line1}</strong>
                </p>
                <p>
                    Deliver By - 
                    <strong>
                        {order.personalDetails?.timeToDeliver ? order.personalDetails.timeToDeliver : "No Time Saved"}
                    </strong>
                </p>

                <br />

                <p>
                    Additional Comments - 
                    <strong>
                        {order.personalDetails?.additionalComments ? order.personalDetails.additionalComments : "None"}
                    </strong>
                </p>

                <br />

                <p>
                    Email - <strong>{order.customer?.email}</strong>
                </p>
                <p>
                    Invoice - <strong>{order.customer?.invoice_prefix}</strong>
                </p>
                <p>
                    Ordered on - <strong>{new Date(order.orderDate).toLocaleDateString()}</strong>
                </p>

                <p style={{ fontSize: "x-large", whiteSpace: "pre-line" }}>
                    <br />
                    <br />

                    <h4>Menu Item / Quantity</h4>
                        {order.orderContents.map((orderItem: any) => (
							<>
								{orderItem.name ? (
									<p>
										<br />
										{orderItem.name?.replace("-", " ")} / {orderItem.count}
										<br />
										<br />
										Quantity - {orderItem?.count}
										<br />
										Price - ${orderItem?.total}
										<hr />
									</p>
								) : null}
                            </>
                        ))}
                </p>
                <form id="finishedOrder" onSubmit={submitOrder}>
                    <Checkbox
                        checked={finishedOrder}
                        status="Info"
                        onChange={(value: boolean): void => {
                            console.log(finishedOrder, value);
                            setFinishedOrder(value);
                        }}
                    >
                        Finished With Order?
                    </Checkbox>
                </form>
                <Button className="mT1" form="finishedOrder" status="Info" fullWidth>
                    <EvaIcon className="mR1" name="log-in" />
                    Finish
                </Button>

                <Popover placement="top" overlay="!! Continuing will not save order status!!" trigger="hint">
                    <Button
                        status="Danger"
                        className="mT1"
                        onClick={() => {
                            location.href = "/dashboard/orders";
                        }}
                        fullWidth
                    >
                        <EvaIcon className="mR1" name="close" />
                        Close
                    </Button>
                </Popover>
            </>
        </Layout>
    );
};

export default View;
