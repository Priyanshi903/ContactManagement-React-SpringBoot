import classes from './MainHeader.module.css';

const MainHeader = () => {
    return (
        <div className={`${classes.navbar}`}>ManageYourContacts<span><i class='fa fa-phone fa-flip-horizontal' ></i></span></div>
    )
}

export default MainHeader;