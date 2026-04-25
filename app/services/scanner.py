from app.services.alerts import trigger_alert


def run_monitoring_scan():

    monitored_posts = [

        {
         "source":"Fan Page 1",
         "image":"app/uploads/modified.jpg",
         "authorized":False
        },

        {
         "source":"Official Partner",
         "image":"app/uploads/org.jpg",
         "authorized":True
        },
        {
        "source":"Random Website",
        "image":"app/uploads/unrelated.jpg",
        "authorized":False
        }

    ]


    alerts=[]

    for post in monitored_posts:

        result = trigger_alert(
            "app/uploads/org.jpg",
            post["image"],
            post["source"],
            post["authorized"]
        )

        alerts.append(result)

    return alerts



if __name__=="__main__":

    results = run_monitoring_scan()

    for r in results:
        print(r)