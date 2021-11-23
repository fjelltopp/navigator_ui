function LogComponent({ title, data }) {

    const preStyle = {
        fontSize: 10,
        whiteSpace: 'pre-wrap'
    }

    return (
        <>
            <div className="shadow p-3 mt-5 bg-body rounded">
                <h4 className="m-2 text-muted">{title}</h4>
                <pre className="bg-light p-2 rounded" style={preStyle}>
                    {JSON.stringify(data, null, 3)}
                </pre>
            </div>
        </>
    )

}

export default function LogsComponent({ objects }) {

    return objects.map((object, index) => (
        <div key={index}>
            <LogComponent
                title={object.title}
                data={object.data}
            />
        </div>
    ))

}
