import React, { useState } from 'react';
import { registerUser } from '../../utils/marketplace';
import { AccountIdentifier } from '@dfinity/nns';
import { Principal } from '@dfinity/principal'; // Import Principal

// import { Principal
//  } from '@dfinity/candid/lib/cjs/idl';

function RegistrationForm() {
    const [user, setUser] = useState({ name: '', number: ''});
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const jj = await window.auth.principalText
        // const address = await window.canister.marketplace.getAddressFromPrincipal(jj)

        console.log(jj)
        // console.log("identifier below")
        // console.log(address)

    //    setUser(prevUser => ({ ...prevUser, wallet: jj }));
    const principal = Principal.fromText(jj);
    console.log(principal)
    let numberBigInt = BigInt(user.number);

            // number: parseInt(user.number, 10),

        // Construct the user object as per the canister's User model
        const userToRegister = {
            name: user.name,
            number: numberBigInt,
        };

        try {
            console.log(userToRegister)
            const response = await registerUser(userToRegister);
            console.log(response);
            const add = await window.canister.marketplace.getAddressFromPrincipal(response.Ok.wallet)
            
            console.log(add)
            alert('User registered successfully');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

//     return (
//         <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
//             <h2>Register User</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Name: </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={user.name}
//                         onChange={handleChange}
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Number: </label>
//                     <input
//                         type="number"
//                         name="number"
//                         value={user.number}
//                         onChange={handleChange}
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 {/* Additional fields or methods to handle 'wallet' can be added here */}
//                 <button type="submit" style={{ padding: '5px 15px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Register</button>
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
        <h2 style={styles.title}>Register User</h2>
        <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Number:</label>
                <input
                    type="number"
                    name="number"
                    value={user.number}
                    onChange={handleChange}
                    style={styles.input}
                />
            </div>
            {/* Additional fields or methods to handle 'wallet' can be added here */}
            <button type="submit" style={styles.submitButton}>Register</button>
        </form>
    </div>
);
}
export default RegistrationForm;



