"""Initial migration

Revision ID: 02e09051d050
Revises: 
Create Date: 2024-10-09 14:30:15.254721

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '02e09051d050'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('thumbnail',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('file_data', sa.LargeBinary(), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_thumbnail_created_date'), 'thumbnail', ['created_date'], unique=False)
    op.create_index(op.f('ix_thumbnail_id'), 'thumbnail', ['id'], unique=False)
    op.create_index(op.f('ix_thumbnail_updated_at'), 'thumbnail', ['updated_at'], unique=False)
    op.create_table('thumbnailscore',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('thumbnail_id', sa.Integer(), nullable=False),
    sa.Column('user_prompt', sa.Text(length=10000), nullable=True),
    sa.Column('score', sa.Float(), nullable=True),
    sa.Column('result_hint', sa.Text(length=10000), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['thumbnail_id'], ['thumbnail.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_thumbnailscore_created_date'), 'thumbnailscore', ['created_date'], unique=False)
    op.create_index(op.f('ix_thumbnailscore_id'), 'thumbnailscore', ['id'], unique=False)
    op.create_index(op.f('ix_thumbnailscore_thumbnail_id'), 'thumbnailscore', ['thumbnail_id'], unique=False)
    op.create_index(op.f('ix_thumbnailscore_updated_at'), 'thumbnailscore', ['updated_at'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_thumbnailscore_updated_at'), table_name='thumbnailscore')
    op.drop_index(op.f('ix_thumbnailscore_thumbnail_id'), table_name='thumbnailscore')
    op.drop_index(op.f('ix_thumbnailscore_id'), table_name='thumbnailscore')
    op.drop_index(op.f('ix_thumbnailscore_created_date'), table_name='thumbnailscore')
    op.drop_table('thumbnailscore')
    op.drop_index(op.f('ix_thumbnail_updated_at'), table_name='thumbnail')
    op.drop_index(op.f('ix_thumbnail_id'), table_name='thumbnail')
    op.drop_index(op.f('ix_thumbnail_created_date'), table_name='thumbnail')
    op.drop_table('thumbnail')
    # ### end Alembic commands ###
