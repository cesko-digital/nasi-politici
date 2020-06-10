from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
import json
not_blank = validate.Length(min=1, error='Field cannot be blank')

class LeagueSchema(Schema):
    id = fields.Integer(dump_only=True)
    instatid = fields.Integer()
    tier = fields.String()
    country_name = fields.String(validate=not_blank)
    name = fields.String(validate=not_blank)

    # self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/data/"
        else:
            self_link = "/data/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'data'

