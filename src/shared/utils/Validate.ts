import type { Rule } from 'ant-design-vue/es/form';
import { tI18n } from './i18n';

interface Ioption {
    required?: boolean
    number?: boolean
    email?: boolean
    thanZero?: boolean
    password?: boolean
}
const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error(tI18n('Must_be_greater_than') + ' 0'));
};

export const V = (name: string, option: Ioption) => {
    const rules: Rule[] = [];
    if (option.required) {
        rules.push({ required: true, message: `${tI18n('Please_input_your')} ${tI18n(name)}` });
    }
    if (option.number) {
        rules.push({ type: 'number', message: tI18n('Type_must_be_number') });
    }
    if (option.email) {
        rules.push({ type: 'email', message: tI18n('Email_must_be_email') });
    }
    if (option.thanZero) {
        rules.push({ validator: checkPrice });
    }
    if (option.password) {
        rules.push({ min: 6, message: tI18n('Password_must_be_at_least') + ' 6 ' + tI18n('characters') });
    }
    return rules
}

