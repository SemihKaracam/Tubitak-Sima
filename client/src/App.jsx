import React, { useEffect } from 'react'

const App = () => {
  // Uygulama kapatıldığında localStorage temizlenmesi için. Çünkü eğer temizlenmezse login işlemi yapmadan sisteme giriş yapılıyor.

  /*
  const clearLocalStorageOnUnload = () => {
    localStorage.clear(); // Tüm localStorage verilerini siler
  };

  useEffect(() => {
    // Component dağımı yapıldığında event listener'ı ekler
    window.addEventListener('beforeunload', clearLocalStorageOnUnload);

    return () => {
      // Component kaldırıldığında event listener'ı kaldırır
      window.removeEventListener('beforeunload', clearLocalStorageOnUnload);
    };
  }, []);
  */

  return <></>
}

export default App