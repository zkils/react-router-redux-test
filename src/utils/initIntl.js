/**
 * Created by krinjadl on 2016-07-28.
 */
import * as messageList from '../resources/lan';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import ja from 'react-intl/locale-data/ja';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...en, ...fr, ...ko, ...ja]);

const LOCALE = navigator.language || 'en';
export const intlData = {
    intl:{
        locale: LOCALE,
        messages:messageList[LOCALE]
    }
}