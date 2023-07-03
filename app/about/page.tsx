"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TenantPage() {
  const [tenantIds, setTenantIds] = useState([]);

  useEffect(() => {
    const cardsData = require("./api/tenant.json");
    const tenantIds = Object.keys(cardsData);
    setTenantIds(tenantIds);
  }, []);

  return (
    <div>
      <h1>Tenant Page</h1>
      <ul>
        {tenantIds.map((tenantId, index) => (
          <li key={index}>
            <Link  legacyBehavior href={`/Tenant/${index}`}>
              <a>Tenant {index}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
