import React, { useState } from 'react';
import { registerBusiness } from '../../utils/marketplace';

function BusinessRegistrationForm() {
    const [business, setBusiness] = useState({ name: '', till: generateTillNumber() });

    // Function to generate a unique 5-digit till number
    function generateTillNumber() {
        return Math.floor(10000 + Math.random() * 90000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Construct the business object as per the canister's BusinessPayload model
        const businessToRegister = {
            name: business.name,
            till: BigInt(business.till), // Convert till number to BigInt
        };

        try {
            console.log(businessToRegister);
            const response = await registerBusiness(businessToRegister);
            console.log(response);
            alert('Business registered successfully');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusiness(prevBusiness => ({ ...prevBusiness, [name]: value }));
    };

//     return (
//         <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
//             <h2>Register Business</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Business Name: </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={business.name}
//                         onChange={handleChange}
//                         style={{ marginLeft: '10px' }}
//                         required
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Till Number: </label>
//                     <input
//                         type="text"
//                         value={business.till}
//                         disabled // Till number is auto-generated
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <button type="submit" style={{ padding: '5px 15px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Register Business</button>
//             </form>
//         </div>
//     );
// }

const styles = {
    container: {
        margin: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '10px',
    },
    label: {
        marginRight: '10px',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    submitButton: {
        padding: '5px 15px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

return (
    <div style={styles.container}>
        <h2 style={styles.title}>Register Business</h2>
        <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
                <label style={styles.label}>Business Name:</label>
                <input
                    type="text"
                    name="name"
                    value={business.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Till Number:</label>
                <input
                    type="text"
                    value={business.till}
                    disabled
                    style={styles.input}
                />
            </div>
            <button type="submit" style={styles.submitButton}>Register Business</button>
        </form>
    </div>
);
}

export default BusinessRegistrationForm;
