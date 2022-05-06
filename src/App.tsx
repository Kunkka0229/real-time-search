import { useState, useEffect, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import { isQQ } from './utils/util';
import request from './utils/request';
import './App.css';

const API = 'https://api.uomg.com/api/qq.info';

interface ResObj {
    qlogo?: string
    name?: string
    qq?: string
    [propName: string]: any
}

function App() {

    const [ query, setQuery ] = useState<string>('');
    const [ res, setRes ] = useState<ResObj>({});
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        if (query && !isQQ(query)) return setError('请输入合法QQ号');
        if (query) {
            const fetchData: any = async (query: string) => {
                try {
                    setLoading(true);
                    const data = await request.get(API, { params: { qq: query } })
                    setLoading(false);
                    setRes(data);
                } catch (error) {
                    setLoading(false);
                    setError('暂未找到正确信息，请重新输入QQ号')
                }
            };
            fetchData(query);
        }
    }, [ query ]);

    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setRes({});
        setError('');
        setQuery(ev.target.value.trim())
    };

    return (
        <div className="container">
            <h1>QQ号查询</h1>
            <section className="search-container">
                <span>QQ</span>
                <input type="text" className="search-input"  onChange={debounce(handleInput, 800)} />
                {error && <span className="search-msg">{error}</span>}
            </section>
            {!loading ?
                (res.qq && <div className="res-container">
                    <img className="logo" src={res.qlogo} alt={res.name} />
                    <div className="content">
                        <div className="name">{res.name}</div>
                        <div className="code">{res.qq}</div>
                    </div>
                </div>)
                :
                <div className="progress"></div>}
        </div>
    );
}

export default App;
