export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/logo.png"   // ton image dans /public
            alt="Logo"
            className={props.className}
        />
    );
}
