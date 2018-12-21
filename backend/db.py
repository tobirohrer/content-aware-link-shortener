import pickledb 

link_db = pickledb.load('/analyse/links.db', False)
stats_db = pickledb.load('/analyse/stats.db', False)

def get_target(url):
    return link_db.get(url)

def set_target(url, target):
    link_db.set(url, target)
    stats_db.set(url, 0)
    link_db.dump()
    link_count = get_link_count()
    return link_count

def update_url_stats(url):
    stats_db.set(url, stats_db.get(url)+1)
    stats_db.dump()

def get_url_stats(url):
    return stats_db.get(url)

def get_link_count():
    return len(link_db.getall())