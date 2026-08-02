from datetime import datetime, timezone
from typing import Optional

class Category:
    def __init__(
        self,
        id: str,
        name: str,
        parent_id: Optional[str] = None,
        created_z: Optional[datetime] = None
    ):
        self.id = id
        self.name = name
        self.parent_id = parent_id
        self.created_z = created_z or datetime.now(timezone.utc)