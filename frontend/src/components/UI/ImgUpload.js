import styles from "./ImgUpload.module.css";
import img from "../assets/img5.svg";

const ImgUpload = (props) => {
  const classes = `${styles["input"]}` + " " + props.className;
  return (
    <div className={styles.container}>
      <label htmlFor={props.id} className={styles["label"]}>
        <img src={img} />
      </label>

      <input
        type="file"
        name={props.name}
        id={props.id}
        accept={props.accept}
        onChange={props.onChange}
        className={classes}
      />
    </div>
  );
};

export default ImgUpload;
