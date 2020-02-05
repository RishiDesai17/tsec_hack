import React,{createContext,useState, useEffect} from 'react';

export const Context = createContext({
    cartItems: [],
    totalPrice: 0,
    add: ()=>{},
    del: ()=>{},
    transfer: ()=>{}
});

const ContextProvider = props => {

    // const fn = async() => {
    //     try{
    //         const resData = await fetch("https://secret-savannah-05381.herokuapp.com/products")
    //         const res = await resData.json();
    //         console.log(res);
    //         setData(res.docs);
    //         setFlag(true);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }
    // useEffect(()=>{
    //     fn();
    // },[])
    const [cartItem, modifyCart] = useState([]);
    const [total, calcTotal] = useState(0);
    const [username,setUsername] = useState("");

    const set = (res) => {
        
    }

    const addToCart = (id,price) => {
        if(cartItem.some(item => item.id===id)){
            cartItem.find(x => {
                if(x.id === id){
                    x.quantity+=1;
                }
            });
        }
        else{
            const item = data.find(x => {
            if(x.id === id){
                return x;
            }
            });
            item.quantity=1;
            modifyCart(y => [...y, item]);
        }
        calcTotal(total+parseInt(price));

      }

      const delFromCart = (id,price) => {
            let qty = false;
            cartItem.find(x => {
                if(x.id === id){
                    qty=true;
                    if(x.quantity>1){
                        x.quantity-=1;
                    }
                    else{
                        x.quantity=0;
                        modifyCart(currentItems => {
                            return currentItems.filter((y) => y.id!==id);
                        });
                    }
                }
            });
        if(total>0 && qty){
            calcTotal(total-parseInt(price));
        }
      }

      const transferUname = (uname) => {
          setUsername(uname);
      }

      return(
          <Context.Provider value={{add: addToCart, del: delFromCart, cartItems: cartItem, totalPrice: total, transfer: transferUname, uname: username}}>
              {props.children}
          </Context.Provider>
      )
}

export default ContextProvider;