# This file was auto-generated by Fern from our API Definition.

from ..core.pydantic_utilities import UniversalBaseModel
from .for_loop_block_yaml import ForLoopBlockYaml
import typing
from .workflow_create_yaml_request import WorkflowCreateYamlRequest
import pydantic
from ..core.pydantic_utilities import IS_PYDANTIC_V2


class WorkflowRequest(UniversalBaseModel):
    json_definition: typing.Optional[WorkflowCreateYamlRequest] = pydantic.Field(default=None)
    """
    Workflow definition in JSON format
    """

    yaml_definition: typing.Optional[str] = pydantic.Field(default=None)
    """
    Workflow definition in YAML format
    """

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="allow", frozen=True)  # type: ignore # Pydantic v2
    else:

        class Config:
            frozen = True
            smart_union = True
            extra = pydantic.Extra.allow
