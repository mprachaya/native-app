import { useEffect, useState } from 'react';
import { getData } from '../utils/async-storage';

export default function useConfig(trigger) {
  const [baseURL, setBaseURL] = useState('');
  const CUSTOMERS =
    '/api/resource/Customer?limit=500&fields=["name","creation","modified","customer_name","customer_type","customer_group","territory","image"]&order_by=creation desc';
  const CUSTOMER = '/api/resource/Customer';
  const CUSTOMER_GROUPS = '/api/resource/Customer Group/';
  const COMPANY = '/api/resource/Company/';
  const TERRITORY = '/api/resource/Territory/';
  const MARKET_SEGMENT = '/api/resource/Market Segment/';
  const INDUSTRY = '/api/resource/Industry Type/';
  const CURRENCY = '/api/resource/Currency/?filters=[["enabled","=",1]]';
  const PRICE_LIST = '/api/resource/Price List/';
  const SALE_PARTNER = '/api/resource/Sales Partner/';
  const PAYMENT_TERM = '/api/resource/Payment Term/';
  const ADDRESS = '/api/resource/Address';
  const QUOTATIONS = '/api/resource/Quotation?fields=["*"]&limit=500&order_by=creation desc';
  const QUOTATION = '/api/resource/Quotation';
  const LEAD = '/api/resource/Lead';
  const CONTACT = '/api/resource/Contact';
  const PAYMENT_TERMS_TEMPLATES = '/api/resource/Payment Terms Template';
  const TERMS_AND_CONDITIONS = '/api/resource/Terms and Conditions';
  const ITEM_QRCODE = '/api/resource/Item';

  const SALES_ORDERS = '/api/resource/Sales Order?fields=["*"]&limit=500&order_by=creation desc';
  const SALES_ORDER = '/api/resource/Sales Order';
  const PROJECT = '/api/resource/Project';
  const WAREHOUSE = '/api/resource/Warehouse';
  const SALES_PARTNER = '/api/resource/Sales Partner';

  const DOCTYPE_EXPORT = '/api/method/frappe.utils.print_format.download_pdf';
  // ?doctype=${docType}&name=${name}&format=${format}`
  // ex. const docType = 'Quotation'; const name = 'SAL-QTN-2023-00001'; const format = 'test-qt';

  const PRINT_FORMAT_DOCTYPE = '/api/resource/Print Format';
  // ?filters=[["doc_type","=","${doctype}"]]

  const getBaseURL = () => {
    getData('URL').then((value) => setBaseURL('https://' + value));
  };
  useEffect(() => {
    getBaseURL();
  }, [trigger]);

  // const BASE_URL = 'https://tonen.vsiam.com';

  return {
    baseURL,
    CUSTOMERS,
    CUSTOMER,
    CUSTOMER_GROUPS,
    COMPANY,
    TERRITORY,
    MARKET_SEGMENT,
    INDUSTRY,
    PRICE_LIST,
    CURRENCY,
    PRICE_LIST,
    SALE_PARTNER,
    PAYMENT_TERM,
    QUOTATIONS,
    QUOTATION,
    ADDRESS,
    LEAD,
    CONTACT,
    TERMS_AND_CONDITIONS,
    PAYMENT_TERMS_TEMPLATES,
    ITEM_QRCODE,
    DOCTYPE_EXPORT,
    PRINT_FORMAT_DOCTYPE,
    PROJECT,
    WAREHOUSE,
    SALES_ORDER,
    SALES_ORDERS,
    SALES_PARTNER,
  };
}
