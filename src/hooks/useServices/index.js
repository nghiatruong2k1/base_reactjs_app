import { useCallback } from 'react';
import useGlobalLoading from '~/hooks/useGlobalLoading';
import { Get, CancelToken } from '~/utils/HttpRequest';

export default function useServices(location) {
  const handleLoading = useGlobalLoading();
  return useCallback(
    ({ method = Get, api, params, onStart, onEnd, onThen, onCatch }) => {
      const ourRequest = CancelToken.source();
      const controller = new AbortController();
      async function handleMethod() {
        console.log(`[start]  service`, [method.name, api, location]);
        const ourLoading = handleLoading();
        onStart && onStart();
        await method(api, params, {
          cancelToken: ourRequest.token,
          signal: controller.signal,
        })
          .then((res) => {
            console.log(`[end]  service`, [method.name, api, res, location]);
            // handleResult(enqueueSnackbar, res.data.message);
            onThen && onThen(res.data);
          })
          .catch((error) => {
            console.log(`[error] service`, [method.name, api, error, location]);
            //handleError(enqueueSnackbar, error);
            onCatch && onCatch(error);
          })
          .finally(() => {
            onEnd && onEnd();
            ourLoading && ourLoading();
          });
      }
      handleMethod();
      return () => {
        console.log(`[cancel] service`, [method.name, api, location]);
        ourRequest && ourRequest.cancel();
        controller && controller.abort();
      };
    },
    [],
  );
}

async function handleError(toast, error) {
  if (error.response) {
    let mes = '';
    if (error.response.data && error.response.data.InnerException) {
      mes = error.response.data.InnerException.Message;
    } else {
      mes = error.message;
    }
    showToast(toast, { message: mes, type: 'error' }, error.response.status);
  } else if (error.message) {
    showToast(toast, { message: error.message, type: 'error' });
  }
}

async function handleResult(toast, message) {
  if (message) {
    if (Array.isArray(message)) {
      message.forEach(function (message) {
        showToast(toast, message);
      });
    } else {
      showToast(toast, message);
    }
  }
}
function showToast(toast, mes, status) {
  switch (typeof mes) {
    case 'string':
    case 'number': {
      break;
    }
    default: {
      if (mes.message.indexOf('Network Error') > -1) {
        toast({
          message: `Kiểm tra lại kết nối mạng!${
            (status && ' (Mã lỗi ' + status + ')') || ''
          }`,
          type: 'error',
        });
      } else if (mes.message.indexOf('Request failed') > -1) {
        toast({
          message: `Yêu cầu bị lỗi!${
            (status && ' (Mã lỗi ' + status + ')') || ''
          }`,
          type: 'error',
        });
      } else if (mes.message.indexOf('A connection was successfully') > -1) {
        toast({
          message: `Kết nối Database không thành công!${
            (status && ' (Mã lỗi ' + status + ')') || ''
          }`,
          type: 'error',
        });
      } else if (
        mes.message.indexOf('The remote certificate was rejected') > -1
      ) {
        toast({
          message: `Kết nối Database bị từ chối!${
            (status && ' (Mã lỗi ' + status + ')') || ''
          }`,
          type: 'error',
        });
      } else {
        toast(mes);
      }
      break;
    }
  }
}
