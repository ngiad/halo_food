import { useCallback, useState } from 'react'


const useCallApi = () => {
    const [loading, setLoading] = useState(false);

    const callGetData = useCallback((cb : any) => {
        if (loading) return;
        setLoading(true);    
        return new Promise(async(resolve,reject) => {
            try {
                const data = await cb();
                resolve(data);
            } catch (error) {
                reject(error);
            } finally {
                setLoading(false);
            }
        })
    }, [loading]);

    return [callGetData, loading];
}


export default useCallApi