import { memo, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Paper,
  Stack,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  SvgIcon,
} from '@mui/material/';
import { SnackbarContent } from 'notistack';

import { useDisclosure } from '@mantine/hooks';
import styles from './Message.module.css';
import { typeToast } from '~/config/Type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const MessageContent = forwardRef(function (
  { title, type, message, onClose },
  ref,
) {
  const [isOpen, { toggle }] = useDisclosure(true);
  const { Title, Icon, Type } = useMemo(() => {
    return {
      Title: title || (typeToast[type] ?? typeToast['bell']).title,
      Icon: (typeToast[type] ?? typeToast['bell']).icon,
      Type: (typeToast[type] ?? typeToast['bell']).className,
    };
  }, [title, type]);
  return (
    <SnackbarContent ref={ref} className={styles.root}>
      <Accordion
        disableGutters
        defaultExpanded
        expanded={isOpen}
        className={clsx(styles.body, Type)}
      >
        <AccordionSummary classes={{ content: styles.content }}>
          <Stack direction="row" alignItems="center" width="100%" spacing={1}>
            {Icon}
            <Typography variant="h6" flex="1" className={styles.title}>
              {Title}
            </Typography>
            <IconButton onClick={toggle}>
              <SvgIcon
                component={<FontAwesomeIcon icon="fa-solid fa-angle-down" />}
                className={clsx(styles.icon)}
                sx={{
                  transform: (isOpen && 'rotate(0deg)') || 'rotate(-90deg)',
                }}
              />
            </IconButton>
            <IconButton onClick={onClose}>
              <SvgIcon component={<FontAwesomeIcon icon="fa-solid fa-circle-xmark" />} />
            </IconButton>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0.5 }}>
          <Paper sx={{ p: 0.5 }} variant="outlined">
            {message}
          </Paper>
        </AccordionDetails>
      </Accordion>
    </SnackbarContent>
  );
});

MessageContent.displayName = 'MessageContent';
MessageContent.propTypes = {
  type: PropTypes.oneOf(Object.keys(typeToast)),
};
export default memo(MessageContent);
