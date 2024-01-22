
import React, { useState } from 'react';
import { transferICP } from '../../utils/ledger';
import { sendUSD, getUserName } from '../../utils/marketplace';

const SendICP = () => {
    const [sellerNumber, setSellerNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [transferStatus, setTransferStatus] = useState('');
    const [userName, setUserName] = useState('');
    const [confirmPayment, setConfirmPayment] = useState(false);

    const fetchUserName = async () => {
        const sellerNumberInt = parseInt(sellerNumber, 10);
        if (isNaN(sellerNumberInt)) {
            setTransferStatus("Invalid seller number");
            return;
        }

        try {
            const name = await getUserName(sellerNumberInt);
            setUserName(name);
            setConfirmPayment(true);
        } catch (error) {
            setTransferStatus(`Error fetching user details: ${error.message}`);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!confirmPayment) {
            await fetchUserName();
            return;
        }

        try {
            
            // const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 100000000));
                    // Ensure the amount is a BigInt
        const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 100000000));
        // Convert sellerNumber to BigInt to properly represent nat64
        const sellerNumberBigInt = BigInt(sellerNumber);
            const result = await sendUSD(sellerNumberBigInt, amountBigInt);
            console.log(result)
            setTransferStatus(`Transfer successful to ${userName}`);
        } catch (error) {
            setTransferStatus(`Transfer failed: ${error.message}`);
        }
    };

//     return (
//         <div>
//             <h2>Send ICP</h2>
//             <form onSubmit={handleTransfer}>
//                 <div>
//                     <label>Seller Number:</label>
//                     <input
//                         type="number"
//                         value={sellerNumber}
//                         onChange={(e) => setSellerNumber(e.target.value)}
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
//                         <p>Confirm payment to: {userName}</p>
//                         <button type="button" onClick={() => setConfirmPayment(false)}>Change Details</button>
//                     </div>
//                 )}
//                 <button type="submit">{confirmPayment ? 'Confirm Payment' : 'Verify Recipient'}</button>
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
    buttonHover: { // Not directly applicable in inline styles
        backgroundColor: '#0056b3',
    },
    status: {
        textAlign: 'center',
        marginTop: '15px',
    }
};

return (
    <div style={styles.container}>
        <h2 style={styles.title}>Send ICP</h2>
        <div style={styles.formContainer}>
            <form onSubmit={handleTransfer}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Seller Number:</label>
                    <input
                        type="number"
                        value={sellerNumber}
                        onChange={(e) => setSellerNumber(e.target.value)}
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
                        <p>Confirm payment to: {userName}</p>
                        <button type="button" style={styles.button} onClick={() => setConfirmPayment(false)}>Change Details</button>
                    </div>
                )}
                <button type="submit" style={styles.button}>
                    {confirmPayment ? 'Confirm Payment' : 'Verify Recipient'}
                </button>
            </form>
        </div>
        {transferStatus && <p style={styles.status}>{transferStatus}</p>}
    </div>
);
};

export default SendICP;

