import React, { useState } from 'react';

export default function TenantSearch() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState({});

    const handleSearch = () => {
        // For demonstration, we are not making actual requests
        // Instead we are simply populating the state with some predefined data

        setData({
            erc: {
                name: "John Doe",
                email: "johndoe@example.com",
                phone: "123-456-7890"
            },
            uSearch: {
                name: "Jane Doe",
                email: "janedoe@example.com",
                phone: "098-765-4321",
                source: "Google"
            },
            illion: {
                name: "James Doe",
                email: "jamesdoe@example.com",
                phone: "111-222-3333"
            }
        });
    }

    return (
        <div>
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Enter name, email, or phone number" 
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                <h2>ERC</h2>
                {data.erc && 
                    <ul>
                        <li>Name: {data.erc.name}</li>
                        <li>Email: {data.erc.email}</li>
                        <li>Phone: {data.erc.phone}</li>
                    </ul>
                }
            </div>

            <div>
                <h2>U Search</h2>
                {data.uSearch && 
                    <ul>
                        <li>Name: {data.uSearch.name}</li>
                        <li>Email: {data.uSearch.email}</li>
                        <li>Phone: {data.uSearch.phone}</li>
                        <li>Source: {data.uSearch.source}</li>
                    </ul>
                }
            </div>

            <div>
                <h2>Illion</h2>
                {data.illion && 
                    <ul>
                        <li>Name: {data.illion.name}</li>
                        <li>Email: {data.illion.email}</li>
                        <li>Phone: {data.illion.phone}</li>
                    </ul>
                }
            </div>
        </div>
    )
}
