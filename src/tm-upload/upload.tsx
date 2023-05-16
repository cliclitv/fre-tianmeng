import { render, useState, h, useEffect, useRef } from "fre"
import { push } from "../use-route"
import { addPost, getArticles, getDogeToken, getPostDetail, getUser, updatePost } from "../util/api"
import './upload.css'

export default function Upload(props) {
    const [post, setPost] = useState({ id: 0, title: "", status: "待审核", sort: "原创", time: "", content: "", tag: "", videos: "" })
    const [article, setArticle] = useState([])

    useEffect(() => {
        window.md = new (window as any).TinyMDE(document.querySelector('textarea'))
        if (props.id > 0) {
            getPostDetail(props.id).then((res: any) => {
                getArticles(res.result.id).then(res2 => {
                    setPost(res.result)
                    setArticle(res2.articles)
                })

            })
        } else {
            // 新增
        }

    }, [])

    function change(key, val) {
        console.log(key, val)
        setPost({
            ...post,
            [key as any]: val,
        } as any)
    }

    function selectTag(item) {
        if (post.tag.indexOf(item) > -1) {
            setPost({
                ...post,
                tag: post.tag.replace(` ${item}`, ''),
            })
        } else {
            setPost({
                ...post,
                tag: post.tag + ' ' + item,
            })
        }

    }

    function submit() {
        if (props.id > 0) {
            updatePost(post as any).then(res => {
                alert(res.msg || '成功啦~')
            })
        } else {
            console.log(post)
            addPost(post as any).then(res => {
                alert(res.msg || '成功啦')
            })
        }
    }

    const tags = [["甜文", "虐文", "爽文", '狗血', '意识流'],
    ['古代', '现代', '民国', '未来'],
    ['HE', 'BE', 'OE'],
    ['1v1', 'NP', '骨科', '年上', '年下', '受转攻', '直掰弯', '攻控', '受控'],
    ['快穿', '悬疑', '破镜重圆', '强制爱', '先虐受后虐攻', '追妻'],
    ['ABO', '生子', '哨兵', '支服'],
    ['娱乐圈', '宫廷', '网游'],
    ['霹雳', '原神'],
    ['授权转载', '无版权转载']]
    return (
        <div className="upload-tm">
            <h1>甜梦投稿</h1>
            <div className="title">
                <input type="text" placeholder="请输入标题" value={post.title} onInput={e => change('title', e.target.value)} />
            </div>
            <section>
                <i class="te te-bold" onclick={() => window.md.bold()}></i>
                <i class="te te-italic" onclick={() => window.md.italic()}></i>
                <i class="te te-quote" onclick={() => window.md.quote()}></i>
                <i class="te te-image" onclick={() => window.md.image()}></i>
                <i class="te te-link" onclick={() => window.md.link()}></i>
                <i class="te te-code" onclick={() => window.md.blockCode()}></i>
            </section>
            <textarea spellcheck="false" placeholder="请输入文案，支持 markdown 语法" value={post.content} onInput={e => change('content', e.target.value)}></textarea>
            <div className="tags">
                <ul>
                    {tags.flat().map((item, index) => <li onClick={() => selectTag(item)} key={index.toString()}
                        className={(post.tag || []).indexOf(item) > -1 ? 'active' : ''}>{item}</li>)}
                </ul>
            </div>
            <div className="articles">
                <ul>
                    {(article || []).map(item => <li onclick={() => push(`/article/${item.id}`)}>{item.title}</li>)}
                    {props.id > 0 && <li onClick={() => push(`/add-article/${post.id}`)}>增加章节</li>}
                </ul>
            </div>
            <div className="options">
                <select value={post.status} onInput={e => change('status', e.target.value)}>
                    <option value="wait">待审核</option>
                    <option value="remove">待删除</option>
                    <option value="under">已下架</option>
                    <option value="public">发布</option>
                </select>
                <select value={post.sort} onInput={e => change('sort', e.target.value)}>
                    <option value="纯爱">纯爱</option>
                    <option value="言情">言情</option>
                    <option value="短篇">短篇</option>
                </select>
                {props.id > 0 && <input type="text" value={post.time} onInput={e => change('time', e.target.value)} />}
            </div>

            <div className="submit" onClick={submit}>
                <button>发布
                </button>
            </div>
        </div>
    )
}
