import classes from './MainHeader.module.css';

const MainHeader = () => {
    return (
        <div className={`${classes.navbar}`}>ManageYourContacts<span><i className='fa fa-phone fa-flip-horizontal' ></i></span></div>
    )
}

export default MainHeader;