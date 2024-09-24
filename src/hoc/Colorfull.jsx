const Colorfull = (WrappedComponent) => {

    const colors= [
        "success",
         "warninig",
         "danger",
         "info",
         "primary",
         "dark",
         "light",
    ];

    let index=Math.floor(Math.random() * 6) ;
    let randomColor= colors[index];
    let className=`bg-${randomColor}`;

    console.log(index);
    console.log(className);
    return (props) => {
        return(

            <div className={className}>
            <WrappedComponent  {... props} />
            </div>
        );
    };
}

export default Colorfull;