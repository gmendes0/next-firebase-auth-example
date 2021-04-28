import { ReactNode } from "react";
import { makeStyles, Typography } from "@material-ui/core";

type IProps = {
  label: string;
  info: string;
  isFirst?: boolean;
};

const useStyles = makeStyles(theme => ({
  cardLabel: {
    fontWeight: 700,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(3),
  },
  cardInfo: {},
}));

export default function ProfileCardInfo({ label, info, isFirst }: IProps) {
  const styles = useStyles();

  return (
    <>
      <Typography
        className={styles.cardLabel}
        style={{ marginTop: isFirst ? 0 : undefined }}
        component="h3"
      >
        {label}
      </Typography>
      <Typography className={styles.cardInfo} variant="body2">
        {info}
      </Typography>
    </>
  );
}
