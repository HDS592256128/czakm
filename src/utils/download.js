export default function download(name, path) {
    let names = encodeURI(name);
    let url =`${process.env.BASE_URL}/download.do?path=${path}&fileName=${names}&type=fastdfs&modelName`;
    window.open(url);
}