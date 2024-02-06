import styles from '../css/footer.module.css'

export default function Footer() {
  return(
    <div className={styles.footer}>
        <p>
          <a href="/">Picture<span className="material-icons">pin_drop</span>Archive</a>
            <span>email : Maparchive@gmail.com</span>
            <span>Copyright 2023. MapArchive. All rights reserved.</span>
        </p>
    </div>
  )
}