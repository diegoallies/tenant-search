import React from 'react';
import './styles.css'

interface Item {
  name: string;
  source: string;
}

interface Section {
  title: string;
  items: Item[];
}

interface CardProps {
  header: string;
  sections: Section[];
}

const Card: React.FC<CardProps> = ({ section }) => {
  return (
    <div className="card">
      <div className="card__content">
        <ul>
          {section.items.map((item, index) => (
            <li key={index} className="card__text">
              <input type="checkbox" id={`item-${index}`} />
              <label htmlFor={`item-${index}`}>{item.name}</label> - <span> {item.source}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const cardsData = [
    // ERC
    {
      companyName: "ERC",
      sections: [
        {
          header: "Names",
          items: [
            { name: "ERC Company Ltd.", source: "source1" },
            { name: "ERC International", source: "source2" },
          ],
        },
        {
          header: "Addresses",
          items: [
            { name: "123 ERC Street, New York, NY 10001", source: "source1" },
            { name: "456 ERC Avenue, Los Angeles, CA 90001", source: "source2" },
          ],
        },
        {
          header: "Numbers",
          items: [
            { name: "(123) 456-7890", source: "source1" },
            { name: "(987) 654-3210", source: "source2" },
          ],
        },
        {
          header: "Emails",
          items: [
            { name: "contact@erc1.com", source: "source1" },
            { name: "info@erc2.com", source: "source2" },
          ],
        },
      ],
    },
    // Illion
    {
      companyName: "Illion",
      sections: [
        {
          header: "Names",
          items: [
            { name: "Illion Corp.", source: "source3" },
            { name: "Illion Enterprises", source: "source4" },
          ],
        },
        {
          header: "Addresses",
          items: [
            { name: "789 Illion Drive, Chicago, IL 60007", source: "source3" },
            { name: "1011 Illion Boulevard, Houston, TX 77002", source: "source4" },
          ],
        },
        {
          header: "Numbers",
          items: [
            { name: "(234) 567-8901", source: "source3" },
            { name: "(876) 543-2109", source: "source4" },
          ],
        },
        {
          header: "Emails",
          items: [
            { name: "support@illion3.com", source: "source3" },
            { name: "sales@illion4.com", source: "source4" },
          ],
        },
      ],
    },
    // Continue in the same fashion for "U Search" and "ZoomInfo"...
      // U Search
  {
    companyName: "U Search",
    sections: [
      {
        header: "Names",
        items: [
          { name: "U Search Solutions", source: "source5" },
          { name: "U Search Technologies", source: "source6" },
        ],
      },
      {
        header: "Addresses",
        items: [
          { name: "1122 U Search Plaza, Seattle, WA 98101", source: "source5" },
          { name: "3344 U Search Way, San Francisco, CA 94101", source: "source6" },
        ],
      },
      {
        header: "Numbers",
        items: [
          { name: "(345) 678-9012", source: "source5" },
          { name: "(765) 432-1098", source: "source6" },
        ],
      },
      {
        header: "Emails",
        items: [
          { name: "help@usearch5.com", source: "source5" },
          { name: "query@usearch6.com", source: "source6" },
        ],
      },
    ],
  },
  // ZoomInfo
  {
    companyName: "ZoomInfo",
    sections: [
      {
        header: "Names",
        items: [
          { name: "ZoomInfo Inc.", source: "source7" },
          { name: "ZoomInfo Global", source: "source8" },
        ],
      },
      {
        header: "Addresses",
        items: [
          { name: "5566 ZoomInfo Blvd, Denver, CO 80014", source: "source7" },
          { name: "7788 ZoomInfo Ave, Phoenix, AZ 85001", source: "source8" },
        ],
      },
      {
        header: "Numbers",
        items: [
          { name: "(456) 789-0123", source: "source7" },
          { name: "(654) 321-0987", source: "source8" },
        ],
      },
      {
        header: "Emails",
        items: [
          { name: "service@zoominfo7.com", source: "source7" },
          { name: "info@zoominfo8.com", source: "source8" },
        ],
      },
    ],
  },

  ];
  
  
  
  const companyNames = cardsData.map((data) => data.companyName);
  const headers = cardsData[0]?.sections.map((section) => section.header);


  return (
    <>
      <header className="header">
        <h1>Tenant Name</h1>
      </header>
      <div className="grid">
        <div className="grid__row">
          <div className="grid__cell"></div> {/* Empty cell for alignment */}
          {companyNames.map((name, index) => (
            <div className="grid__cell" key={index}>{name}</div>
          ))}
        </div>
        {headers?.map((header, headerIndex) => (
          <div className="grid__row" key={headerIndex}>
            <div className="grid__cell">{header}</div>
            {cardsData.map((companyData, index) => (
              <div className="grid__cell" key={index}>
                <Card header={header} section={companyData.sections[headerIndex]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};


export default App;
