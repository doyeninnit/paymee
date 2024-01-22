
import React, { useState } from 'react';
import { payMerchant, getBusinessDetails } from '../../utils/marketplace';

 const PayMerchant = () => {
    const [tillNumber, setTillNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [transferStatus, setTransferStatus] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [confirmPayment, setConfirmPayment] = useState(false);

    const fetchBusinessDetails = async () => {
        const tillNumberInt = parseInt(tillNumber, 10);
        if (isNaN(tillNumberInt)) {
            setTransferStatus("Invalid till number");
            return;
        }

        try {
            const businessName = await getBusinessDetails(tillNumberInt);
            setBusinessName(businessName);
            setConfirmPayment(true);
        } catch (error) {
            setTransferStatus(`Error fetching business details: ${error.message}`);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!confirmPayment) {
            await fetchBusinessDetails();
            return;
        }

        try {
            const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 100000000));
            await payMerchant(parseInt(tillNumber, 10), amountBigInt);
            setTransferStatus(`Payment successful to ${businessName}`);
        } catch (error) {
            setTransferStatus(`Payment failed: ${error.message}`);
        }
    };

//     return (
//         <div>
//             <h2>Pay Merchant</h2>
//             <form onSubmit={handlePayment}>
//                 <div>
//                     <label>Merchant Till Number:</label>
//                     <input
//                         type="number"
//                         value={tillNumber}
//                         onChange={(e) => setTillNumber(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Amount (ICP):</label>
//                     <input
//                         type="number"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {confirmPayment && (
//                     <div>
//                         <p>Confirm payment to: {businessName}</p>
//                         <button type="button" onClick={() => setConfirmPayment(false)}>Change Details</button>
//                     </div>
//                 )}
//                 <button type="submit">{confirmPayment ? 'Confirm Payment' : 'Check Merchant'}</button>
//             </form>
//             {transferStatus && <p>{transferStatus}</p>}
//         </div>
//     );
// };


const styles = {
    container: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    formContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px 10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        marginTop: '10px',
    },
    status: {
        textAlign: 'center',
        marginTop: '15px',
    },
};

return (
    <div style={styles.container}>
        <h2 style={styles.title}>Pay Merchant</h2>
        <div style={styles.formContainer}>
            <form onSubmit={handlePayment}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Merchant Till Number:</label>
                    <input
                        type="number"
                        value={tillNumber}
                        onChange={(e) => setTillNumber(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Amount (ICP):</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                {confirmPayment && (
                    <div style={styles.status}>
                        <p>Confirm payment to: {businessName}</p>
                        <button type="button" style={styles.button} onClick={() => setConfirmPayment(false)}>Change Details</button>
                    </div>
                )}
                <button type="submit" style={styles.button}>
                    {confirmPayment ? 'Confirm Payment' : 'Check Merchant'}
                </button>
            </form>
        </div>
        {transferStatus && <p style={styles.status}>{transferStatus}</p>}
    </div>
);
};
export default PayMerchant;
