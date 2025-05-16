import React, { useState } from 'react';
import './TarrifsPage.css';
import OrderModal from '../OrderModal';
import TariffModal from './TariffModal';

const tariffs = [
  {
    name: 'Безлимит X',
    price: '29,80',
    description: [
      { icon: 'icons/unlim.png', text: 'Безлимитные ГБ' },
      { icon: 'icons/unlim.png', text: 'Безлимитные минуты' }
    ],
    fullDescription: 'Тариф «Безлимит X» предлагает вам за 29.80 р/мес безлимит звонков внутри сети, безлимит интернета без ограничений по скорости и безлимит сообщений внутри сети. Стоимость звонков в другие сети – 0.15 р/мин.'
  },
  {
    name: 'Быстрый 10',
    price: '17,80',
    description: [
      { icon: 'icons/wifi.png', text: '10 ГБ интернета' },
      { icon: 'icons/phone.png', text: '400 минут' }
    ],
    fullDescription: 'Тариф «Быстрый 10» предлагает вам за 17.80 руб/мес 10 ГБ интернета без ограничений по скорости, 400 минут звонков внутри сети и 100 смс внутри сети. После использования минут — 0.05 р/мин, другие сети — 0.15 р/мес, смс — 0.08 р, интернет — 2 р/мес – до 200 МБ, 10 р/мес – от 200 МБ до 2 ГБ, 20 р/мес – от 2 до 10 ГБ, 45 р/мес – от 10 до 30 ГБ, 65 р/мес – более 30 ГБ.'
  },
  {
    name: 'Близкий',
    price: '7,90',
    description: [
      { icon: 'icons/wifi.png', text: '100 МБ трафика' },
      { icon: 'icons/unlim.png', text: 'Звонки внутри сети' },
      { icon: 'icons/pensioner.png', text: 'Для пенсионеров' }
    ],
    fullDescription: 'Тариф «Близкий» предназначен для семей. За 7.90 р/мес включает безлимитные звонки и сообщения для 3 избранных номеров и 100 МБ интернета. Прочие звонки — от 0.05 до 0.15 р/мин, интернет — 2 р/мес – до 200 МБ, 10 р/мес – от 200 МБ до 2 ГБ, 20 р/мес – от 2 до 10 ГБ, 45 р/мес – от 10 до 30 ГБ, 65 р/мес – более 30 ГБ.'
  },
  {
    name: 'Безлимит',
    price: '19,99',
    description: [
      { icon: 'icons/unlim.png', text: 'Безлимитные ГБ' },
      { icon: 'icons/phone.png', text: '300 минут звонков' }
    ],
    fullDescription: 'Тариф «Безлимит» за 19.99 р/мес предлагает неограниченный интернет и 300 минут звонков в любую сеть. После исчерпания минут — 0.10 р/мин.'
  },
  {
    name: 'Быстрый 20',
    price: '23,50',
    description: [
      { icon: 'icons/wifi.png', text: '20 ГБ интернета' },
      { icon: 'icons/phone.png', text: '500 минут' }
    ],
    fullDescription: 'Тариф «Быстрый 20» за 23.50 р/мес включает 20 ГБ интернета и 500 минут звонков. Превышение лимита — 2 р/мес – до 200 МБ, 10 р/мес – от 200 МБ до 2 ГБ, 20 р/мес – от 2 до 10 ГБ, 45 р/мес – от 10 до 30 ГБ, 65 р/мес – более 30 ГБ., звонки — от 0.1 р/мин.'
  },
  {
    name: 'Детский',
    price: '5,00',
    description: [
      { icon: 'icons/wifi.png', text: '300 МБ интернета' },
      { icon: 'icons/phone.png', text: '100 минут' }
    ],
    fullDescription: 'Тариф «Детский» за 5 р/мес включает 300 МБ интернета и 100 минут. После превышения: звонки — 0.05 р/мин, интернет — 2 р/мес – до 200 МБ, 10 р/мес – от 200 МБ до 2 ГБ, 20 р/мес – от 2 до 10 ГБ, 45 р/мес – от 10 до 30 ГБ, 65 р/мес – более 30 ГБ.'
  }
];


const TariffsPage = ({ onOrderClick }) => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

  const openInfoModal = (tariff) => {
    setSelectedTariff(tariff);
    setInfoModalOpen(true);
  };

  return (
    <div className="tariffs-page">
      <h1>Тарифы</h1>
      <div className="tariffs-container">
        {tariffs.map((tariff, index) => (
          <div key={index} className="tariff-card">
            <h2>{tariff.name}</h2>
            <ul>
              {tariff.description.map((item, i) => (
                <li key={i}>
                  <img src={item.icon} alt="" className="feature-img" />
                  {item.text}
                </li>
              ))}
            </ul>
            <p><strong>{tariff.price}</strong> руб/мес</p>
            <button
              className='order'
              onClick={() => onOrderClick(tariff.name)}
            >
              Заказать
            </button>
            <button
              className='info'
              onClick={() => openInfoModal(tariff)}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>

      {isInfoModalOpen && selectedTariff && (
        <TariffModal
          onClose={() => setInfoModalOpen(false)}
          tariffName={selectedTariff.name}
          description={selectedTariff.fullDescription}
        />
      )}
    </div>
  );
};

export default TariffsPage;
