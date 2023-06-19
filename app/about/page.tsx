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
            { name: "Name 1", source: "source1" },
            { name: "Name 2", source: "source2" },
          ],
        },
        {
          header: "Addresses",
          items: [
            { name: "Address 1", source: "source1" },
            { name: "Address 2", source: "source2" },
          ],
        },
        {
          header: "Numbers",
          items: [
            { name: "Number 1", source: "source1" },
            { name: "Number 2", source: "source2" },
          ],
        },
        {
          header: "Address 2",
          items: [
            { name: "Address2 1", source: "source1" },
            { name: "Address2 2", source: "source2" },
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
            { name: "Name 3", source: "source3" },
            { name: "Name 4", source: "source4" },
          ],
        },
        {
          header: "Addresses",
          items: [
            { name: "Address 3", source: "source3" },
            { name: "Address 4", source: "source4" },
          ],
        },
        {
          header: "Numbers",
          items: [
            { name: "Number 3", source: "source3" },
            { name: "Number 4", source: "source4" },
          ],
        },
        {
          header: "Address 2",
          items: [
            { name: "Address2 3", source: "source3" },
            { name: "Address2 4", source: "source4" },
          ],
        },
      ],
    },
    // U Search
    {
      companyName: "U Search",
      sections: [
        {
          header: "Names",
          items: [
            { name: "Name 5", source: "source5" },
            { name: "Name 6", source: "source6" },
          ],
        },
        {
          header: "Addresses",
          items: [
            { name: "Address 5", source: "source5" },
            { name: "Address 6", source: "source6" },
          ],
        },
        {
          header: "Numbers",
          items: [
            { name: "Number 5", source: "source5" },
            { name: "Number 6", source: "source6" },
          ],
        },
        {
          header: "Address 2",
          items: [
            { name: "Address2 5", source: "source5" },
            { name: "Address2 6", source: "source6" },
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
            { name: "Name 7", source: "source7" },
            { name: "Name 8", source: "source8" },
          ],
        },
        {
          header: "Addresses",
          items: [
            { name: "Address 7", source: "source7" },
            { name: "Address 8", source: "source8" },
          ],
        },
        {
          header: "Numbers",
          items: [
            { name: "Number 7", source: "source7" },
            { name: "Number 8", source: "source8" },
          ],
        },
        {
          header: "Address 2",
          items: [
            { name: "Address2 7", source: "source7" },
            { name: "Address2 8", source: "source8" },
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
