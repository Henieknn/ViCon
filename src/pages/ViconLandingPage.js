import React, { useState } from "react";
import PromoModal from '../PromoModal'; // импорт модалки
import "./ViconLandingPage.css";

export default function ViconLandingPage() {
  const [isPromoOpen, setPromoOpen] = useState(false);

  const promoText = (
    <>
      <p><b>Период акции:</b> Акция действует с 69.420.228 по 42.52.1339 включительно.</p>
      <p><b>Участники акции:</b> Участниками акции могут стать все новые и действующие абоненты, которые оформляют новую SIM-карту в любом из салонов связи компании.</p>
      <p><b>Условия оформления:</b></p>
      <ul>
        <li>Для участия в акции необходимо оформить новую SIM-карту на тарифный план компании.</li>
        <li>При оформлении необходимо предоставить удостоверение личности.</li>
      </ul>
      <p><b>Получение бонуса:</b></p>
      <ul>
        <li>Каждому участнику, который выполнит условия акции, будет начислен случайный "секретный бонус", например дополнительные минуты, гигабайты интернета, скидка на следующий месяц и т.д.</li>
        <li>Бонус будет активирован автоматически в течение очень много дней после оформления SIM-карты.</li>
      </ul>
      <p><b>Дополнительные условия:</b></p>
      <ul>
        <li>Бонус не подлежит обмену на денежные средства.</li>
        <li>В случае возврата SIM-карты бонус аннулируется.</li>
        <li>Компания оставляет за собой право изменять условия акции или прекращать ее действие без предварительного уведомления.</li>
      </ul>
      <p><b>Контактная информация:</b> Для получения дополнительной информации об акции обращайтесь в службу поддержки по номеру +375 29 540 5563 или на сайт <a href="https:/www.popb.by">www.popb.by</a>.</p>
      <p><b>Примечание:</b> Условия акции могут варьироваться в зависимости от региона и конкретного тарифного плана. Рекомендуется уточнять детали в салонах связи или на официальном сайте компании.</p>
    </>
  );

  return (
    <div className="vicon-wrapper">
      <section
        className="vicon-hero"
        onClick={() => setPromoOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        <h1 className="vicon-hero-title">Секретный бонус при заказе карты SIM</h1>
      </section>

      <section className="vicon-features">
        <h2 className="vicon-section-title">Почему мы?</h2>
        <div className="vicon-feature-grid">
          <div className="vicon-feature">
            <h3 className="vicon-feature-title">Быстрая связь</h3>
            <img src="./icons/fast-connection.png" alt="Быстрая связь" className="vicon-icon" />
          </div>
          <div className="vicon-feature">
            <h3 className="vicon-feature-title">Низкие цены</h3>
            <img src="./icons/low-price.png" alt="Низкие цены" className="vicon-icon" />
          </div>
          <div className="vicon-feature">
            <h3 className="vicon-feature-title">Широкая география услуг</h3>
            <img src="./icons/global-service.png" alt="Широкая география услуг" className="vicon-icon" />
          </div>
        </div>
      </section>

      <PromoModal isOpen={isPromoOpen} onClose={() => setPromoOpen(false)}>
        {promoText}
      </PromoModal>
    </div>
  );
}
