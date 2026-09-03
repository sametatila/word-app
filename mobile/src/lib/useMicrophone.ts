import { useEffect, useState } from "react";
import { hasMicrophone } from "./stt";

/**
 * Cihazda mikrofon var mı — mikrofonlu girişleri (yürüyüş modu, konuşma) gizlemek için.
 *
 * Manifest mikrofonu `required="false"` ile işaretliyor ki Play mikrofonsuz cihazları
 * dağıtım dışında bırakmasın; karşılığında o cihazlarda çalışmayacak girişleri
 * göstermemek gerekiyor (Play "bozuk işlevsellik").
 *
 * Cevap gelene kadar VAR varsayılır: donanım gerçekten yoksa tek bir kare boyunca
 * fazladan bir satır görünür; tersi (kısa süre gizleyip sonra göstermek) her açılışta
 * arayüzü zıplatırdı.
 */
export function useMicrophone(): boolean {
  const [has, setHas] = useState(true);
  useEffect(() => {
    let alive = true;
    void hasMicrophone().then((v) => { if (alive) setHas(v); });
    return () => { alive = false; };
  }, []);
  return has;
}
