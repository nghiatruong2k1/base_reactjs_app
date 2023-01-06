import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const typeToast = {
  error: {
    title: 'Có lỗi',
    icon: <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />,
    className: 'type-containedError',
  },
  help: {
    title: 'Thông báo',
    icon: <FontAwesomeIcon icon="fa-solid fa-circle-question" />,
    className: 'type-containedHelp',
  },
  success: {
    title: 'Thông báo',
    icon: <FontAwesomeIcon icon="fa-solid fa-circle-check" />,
    className: 'type-containedSuccess',
  },
  warning: {
    title: 'Cảnh báo',
    icon: <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />,
    className: 'type-containedWarning',
  },
  bell: {
    title: 'Thông báo',
   icon: <FontAwesomeIcon icon="fa-solid fa-bell" />,
    className: 'type-containedBell',
  },
  default: {
    title: 'Thông báo',
    icon: <FontAwesomeIcon icon="Notifications" />,
    className: 'type-containedPrimary',
  },
};
export const typeInput = {
  text:'',
  checkbox:'',
  radio:'',
}