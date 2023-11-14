import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import QRCode from 'react-qr-code';
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});
const cookies = new Cookies();
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: 12,
    fontFamily: 'Roboto',
  },
  text: {
    fontFamily: 'Roboto',
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    fontFamily: 'Roboto',
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
export default function PDFHandler({ orders, isSave, dateFrom, dateTo }) {
  const [profit, setProfit] = useState(0);
  const calcTotal = () => {
    let profitTemp = 0;
    orders.forEach((order) => {
      profitTemp += parseFloat(order.total_cost).toFixed(2);
    });
    setProfit(parseFloat(parseFloat(profitTemp).toFixed(2)));
  };
  useEffect(() => {
    calcTotal();
  }, []);
  const Br = () => "\n";
  return (
    <>
      {isSave ? (
        <Document>
          <Page style={styles.body}>
            <Text style={styles.header} fixed>
              ~ Чек заказа ~
            </Text>
            <Text style={styles.title}>Заказ</Text>
            <Text style={styles.author}>
              {cookies.get('user').split(' ')[0]} {cookies.get('user').split(' ')[1]}
            </Text>
            <Text style={styles.subtitle}>
              от: {dateFrom} <Br />до: {dateTo}
            </Text>
            {orders.map((item, index) => (
              <Text style={styles.text}>
                ID заказа: {item.id}<Br />
                Дата заселения: {new Date(item.check_in_date).toLocaleDateString()}<Br />
                Дата выезда: {new Date(item.check_out_date).toLocaleDateString()}<Br />
                Общая стоимость: {parseFloat(item.total_cost).toFixed(2)} $<Br />
                Статус: {item.status === 'success' ? 'Оплачено' : 'Не оплачено'}
              </Text>
            ))}
           <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
              fixed
            />
          </Page>
        </Document>
      ) : (
        <Document>
          <Page style={styles.body}>
            <Text style={styles.header} fixed>
              ~ Отчёт ~
            </Text>
            <Text style={styles.title}>Заказы онлайн-платформы</Text>
            <Text style={styles.author}>Stanislav Kozachenko</Text>
            <Text style={styles.subtitle}>
              на {dateFrom} / {dateTo}
            </Text>
            {orders.map((item, index) => (
              <Text style={styles.text}>
                ID: {item.id}<Br />
                ID пользователя: {item.user.id}<Br />
                Дата бронирования: {new Date(item.check_in_date).toLocaleDateString()}<Br />
                Общая стоимость: {parseFloat(item.total_cost).toFixed(2)} $<Br />
                Статус: {item.status === 'success' ? 'Оплачено' : 'Не оплачено'}<Br />
              </Text>
            ))}
            <Text style={styles.text}>Общая сумма выручки: {profit} $</Text>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
              fixed
            />
          </Page>
        </Document>
      )}
    </>
  );
}
