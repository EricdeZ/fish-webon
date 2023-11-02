import {debug} from "./env.js";

const test_backend_url = 'http://georg.safir.com/backend/'
const prod_backend_url = 'https://safir.com/backend/'

export const backend_url = debug.testing_environment ? test_backend_url : prod_backend_url

export const endpoints = {
    get_personal_Info: backend_url + 'event-plugin-ticket-info',
    get_qr_token: backend_url + 'event-plugin-qrcode',
    get_image_urls: backend_url + 'event-plugin-images',
}

const PROD_EVENT_ID = 'C2XfT7iLunEbag'
const TEST_EVENT_ID = '8Z7h5L26puYzty'

export const EVENT_ID = debug.testing_environment ? TEST_EVENT_ID : PROD_EVENT_ID